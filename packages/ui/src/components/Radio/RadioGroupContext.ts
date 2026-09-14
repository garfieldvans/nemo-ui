import { createContext } from "react";

import type { RadioGroupContextValue } from "./Radio.types";

export const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);