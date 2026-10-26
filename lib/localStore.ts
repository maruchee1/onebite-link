import { useSyncExternalStore } from "react";

type LocalStore<T> = {
  /** 현재 값을 구독하는 훅 */
  useValue: () => T;
  /** 값을 갱신하고 저장한 뒤 구독자에게 알린다 */
  update: (updater: (prev: T) => T) => void;
};

/**
 * localStorage에 영속되는 간단한 외부 저장소.
 * 서버 렌더링에서는 initial을, 브라우저에서는 저장된 값을 사용한다.
 */
export function createLocalStore<T>(
  key: string,
  initial: T,
  isValid: (value: unknown) => value is T,
): LocalStore<T> {
  let value: T = initial;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const hydrate = () => {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return;
      const parsed: unknown = JSON.parse(raw);
      if (isValid(parsed)) value = parsed;
    } catch {
      // 손상된 데이터는 무시하고 기본값 사용
    }
  };

  const persist = () => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패(프라이빗 모드 등)는 무시
    }
  };

  const emit = () => listeners.forEach((listener) => listener());

  const subscribe = (listener: () => void) => {
    hydrate();
    listeners.add(listener);

    // 다른 탭에서 바뀐 경우 다시 불러옴
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== key) return;
      hydrated = false;
      hydrate();
      emit();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  const getSnapshot = () => {
    hydrate();
    return value;
  };

  const getServerSnapshot = () => initial;

  return {
    useValue: () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
    update: (updater) => {
      hydrate();
      value = updater(value);
      persist();
      emit();
    },
  };
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
