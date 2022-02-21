export const getDiffDate = (timestamp: number | string): string => {
  // 本地获取时间不一定准确
  let timeDiff = new Date().getTime() / 1000 - Number(timestamp);
  const year = Math.floor(timeDiff / 86400 / 365);
  if (year > 0) return `${year}年前`;
  timeDiff %= (86400 * 365);
  const month = Math.floor(timeDiff / 86400 / 30);
  if (month > 0) return `${month}月前`;
  const day = Math.floor(timeDiff / 86400);
  if (day > 0) return `${day}天前`;
  return '今日';
};

export const formatDate = (timestamp: string): string => {
  const d = new Date(Number(timestamp) * 1000);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = d.getMinutes();
  return `${y}-${m}-${day} ${h}:${min}`;
};
