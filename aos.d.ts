declare module "aos" {
  interface AOSOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
  }

  export function init(options?: AOSOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
}
