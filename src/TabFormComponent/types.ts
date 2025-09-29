import { Dispatch, SetStateAction } from "react";

export type ThemeOption = "dark" | "light";

export interface TabFormData {
  name: string;
  age: string;
  email: string;
  interest: string[];
  theme: ThemeOption;
}

export type TabFormErrors = Partial<{
  name: string;
  age: string;
  email: string;
  interest: string;
}>;

export interface TabComponentProps {
  data: TabFormData;
  setData: Dispatch<SetStateAction<TabFormData>>;
  error: TabFormErrors;
}
