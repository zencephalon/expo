import { images } from '../images';
import { ImageTestGroup, ImageTestPropsFnInput } from '../types';

const imageTests: ImageTestGroup = {
  name: 'Blur',
  tests: [
    {
      name: 'Blur radius: Downscaled image',
      props: ({ range }: ImageTestPropsFnInput) => ({
        source: images.require_jpg2,
        blurRadius: range(0, 60),
      }),
    },
    {
      name: 'Blur radius: Stretched image',
      props: ({ range }: ImageTestPropsFnInput) => ({
        source: images.require_jpg2,
        resizeMode: 'stretch',
        blurRadius: range(0, 60),
      }),
    },
    {
      name: 'Blur radius: Image@3x upscaled',
      props: ({ range }: ImageTestPropsFnInput) => ({
        source: images.default_img,
        resizeMode: 'cover',
        blurRadius: range(0, 60),
      }),
    },
    {
      name: 'Blur radius: Image@3x intrinsic',
      props: ({ range }: ImageTestPropsFnInput) => ({
        source: images.default_img,
        defaultStyle: {},
        blurRadius: range(0, 60),
      }),
    },
    {
      name: 'Blur radius: Animated gif',
      props: ({ range }: ImageTestPropsFnInput) => ({
        source: images.uri_gif,
        blurRadius: range(0, 60),
      }),
    },
  ],
};

export default imageTests;
