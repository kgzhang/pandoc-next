import { FC } from "react";
import { ProgressSteps, Step } from "baseui/progress-steps";

export enum PandocStep {
  Upload = 0,
  Convert = 1,
  Download = 2,
}

interface IProps {
  step: PandocStep;
}

export const Steps: FC<IProps> = ({ step }) => {
  return (
    <ProgressSteps current={step}>
      <Step title="上传" />
      <Step title="转换" />
      <Step title="下载" />
    </ProgressSteps>
  );
};
