import React from 'react'
import { MdHourglassTop, MdOutlineError } from 'react-icons/md';
import { ContentContainer } from '../../ux/ContentContainer'
import ImgDynamic from './ImgDynamic'
import { ImageError, ImageList, ImageLoading, ImageWrapper } from './ImgDynamicStyles';

const imageSize = 200;
const imageSizePx = `${imageSize}px`;

// eslint-disable-next-line react/display-name
const Loading = React.memo(() => <ImageLoading width={imageSizePx} height={imageSizePx} >
  <MdHourglassTop />
</ImageLoading>)

// eslint-disable-next-line react/display-name
const Error = React.memo(() => <ImageError width={imageSizePx} height={imageSizePx} >
  <MdOutlineError />
</ImageError>)

/**
 * Container for list of ImgDynamic components
 * @returns {React.ReactElement}
 */
const ImgDynamicContainer = ({ imageCount }: { imageCount: number }) => {

  const testData = new Array(imageCount).fill(0);

  // Note this deliberately loads large images from picsum
  // to force longer loading times

  return (<>
    <ContentContainer
      title="Dynamic Images"
      codeLink="/features/imgdynamic"
      markDownPromise={import('./requirements.md')}
    >
      <div role="main">
        <ImageList>
          {testData.map(
            (_, i) => <ImageWrapper width={imageSizePx} height={imageSizePx} key={i}>
              <ImgDynamic
                id={`img-${i}`}
                loadingComp={<Loading />}
                errorComp={<Error />}
                width={imageSize}
                height={imageSize}
                src={`https://picsum.photos/id/${(Math.random() * 1000).toFixed(0)}/800`}
              />
            </ImageWrapper>
          )}
        </ImageList>
      </div>
    </ContentContainer>
  </>
  )
}

export default ImgDynamicContainer