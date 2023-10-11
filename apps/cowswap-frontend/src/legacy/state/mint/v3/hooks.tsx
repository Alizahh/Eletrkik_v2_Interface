import { AppState } from "legacy/state";
import { useAppSelector } from "legacy/state/hooks";

export function useV3MintState(): AppState['mintV3'] {
    return useAppSelector((state) => state.mintV3)
  }

  