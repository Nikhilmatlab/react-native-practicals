import { Types } from "..";

export type photoItemType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type CardItemType = {
  item: Types.photoItemType;
  onSwitchPress: () => void;
};
