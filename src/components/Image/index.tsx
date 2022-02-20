import React, { FC, useState } from 'react';
// https://unsplash.com/photos/gySMaocSdqs
type Props = {
  src?: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
};

const _Image: FC<Props> = props => {
  const img = new Image();
  img.src = props.src!;
  img.alt = props.alt!;
  const [source, setSource] = useState(props.defaultSrc);
  img.addEventListener('load', () => {
    setSource(props.src!);
  });
  return (
    <img src={source} alt={props.alt!} className={props.className} />
  );
};

_Image.defaultProps = {
  src: '',
  className: '',
  alt: ''
};

export default _Image;
