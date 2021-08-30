export type NumberValueJson = {
  value: number;
  step: number;
  lower: number;
  upper: number;
  zeroIsInfinity: boolean;
  suffix: string;
  type: "NUMBER";
};

export type BooleanValueJson = {
  value: boolean;
  type: "BOOLEAN";
};

export type EnumValueJson = {
  index: number;
  options: string[];
  type: "ENUM";
};

export type ValueJson = NumberValueJson | BooleanValueJson | EnumValueJson;

export type GameOptionJson = {
  value: ValueJson;
  category: string;
  priority: number;
  key: string;
};
