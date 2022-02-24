import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
// https://unsplash.com/photos/gySMaocSdqs
// https://unsplash.com/photos/aOC7TSLb1o8
type Props = {
  src?: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
};

const _Image: FC<Props> = props => {
  const [source, setSource] = useState(props.defaultSrc);
  const loadEvent = useCallback(() => setSource(props.src!), [props.src]);

  useEffect(() => {
    let img: HTMLImageElement | null = new Image();
    img.src = props.src!;

    img.addEventListener('load', loadEvent);

    return () => {
      img?.removeEventListener('load', loadEvent);
      img = null;
    };
  }, [loadEvent, props.src]);

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
