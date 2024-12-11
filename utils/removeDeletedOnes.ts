interface DataItem {
  deletedAt?: Date;
  [key: string]: any;
}

const removeDeletedOnes = (data: DataItem[]): DataItem[] => {
  return data
    .filter((item) => !item.deletedAt)
    .map(({ deletedAt, ...rest }) => rest);
};

export default removeDeletedOnes;
