import { FC, useCallback } from "react";
import { useStyletron } from "styletron-react";
import { IStatus } from "../lib/writeMetaFile";
import { ListItem, ListItemLabel } from "baseui/list";
import appConfig from "../lib/config";
import { Button } from "baseui/button";

interface IProps {
  status: IStatus;
  onDownload(name: string): void;
}

export const UploadStatus: FC<IProps> = ({
  status: { name, format, date, success },
  onDownload,
}) => {
  const [css] = useStyletron();
  const handleClick = useCallback(() => {
    onDownload(name);
  }, [status]);

  return (
    <ul
      className={css({
        paddingLeft: 0,
      })}
    >
      <ListItem>
        <ListItemLabel description="状态">
          {typeof success === "boolean"
            ? success
              ? "成功"
              : "失败"
            : "处理中"}
        </ListItemLabel>
      </ListItem>

      <ListItem>
        <ListItemLabel description="更新时间">
          {new Date().toLocaleString()}
        </ListItemLabel>
      </ListItem>

      <ListItem>
        <ListItemLabel description="创建时间">
          {new Date(date).toLocaleString()}
        </ListItemLabel>
      </ListItem>
      <ListItem>
        <ListItemLabel description="目标格式">
          {appConfig.formats.find((f) => f.value === format).id}
        </ListItemLabel>
      </ListItem>
      <ListItem>
        <ListItemLabel>
          <Button onClick={handleClick} disabled={!success}>
            去下载
          </Button>
        </ListItemLabel>
      </ListItem>
    </ul>
  );
};
