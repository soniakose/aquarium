import { type Meta, type StoryObj } from '@storybook/react'
import { Carousel } from 'src/components/data-display/Carousel/Carousel'
import { ExampleStory } from 'src/utils/ExampleStory'
import { type RadioChangeEvent } from 'antd'
import { type CarouselProps } from 'antd'
import { useState } from 'react'
import { Radio } from 'src/components'

const meta: Meta<typeof Carousel> = {
  title: 'Aquarium/Data Display/Carousel',
  component: Carousel,

  args: {},
}
export default meta

type Story = StoryObj<typeof Carousel>

export const Primary: Story = {}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

export const ExampleBasic: Story = {
  render: () => {
    const onChange = (currentSlide: number) => {
      console.log(currentSlide)
    }

    return (
      <ExampleStory title="Basic Usage">
        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </ExampleStory>
    )
  },
}

export const ExamplePosition: Story = {
  render: () => {
    type DotPosition = CarouselProps['dotPosition']

    const [dotPosition, setDotPosition] = useState<DotPosition>('bottom')

    const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
      setDotPosition(value as DotPosition)
    }

    return (
      <ExampleStory title="There are 4 position options available.">
        <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
          <Radio.Button value="bottom">Bottom</Radio.Button>
          <Radio.Button value="top">Top</Radio.Button>
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
        <Carousel dotPosition={dotPosition} style={{ maxHeight: '140px' }}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </ExampleStory>
    )
  },
}

export const ExampleAutoScroll: Story = {
  render: () => {
    return (
      <ExampleStory title="Timing of scrolling to the next card/picture.">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </ExampleStory>
    )
  },
}

export const ExampleFadeIn: Story = {
  render: () => {
    return (
      <ExampleStory title="Slides use fade for transition.">
        <Carousel effect="fade">
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>{' '}
      </ExampleStory>
    )
  },
}