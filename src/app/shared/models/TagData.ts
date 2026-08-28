import type { SeverityType } from './types/SeverityType';

export interface TagData {
  label: string;
  severity: SeverityType;
  icon?: string;
  rounded?: boolean;
}
