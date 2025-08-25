import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tag, { TagVariant } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Common/Tag',
  component: Tag,
  args: {
    children: '태그',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark',
      ] satisfies TagVariant[],
    },
    onClick: { action: 'clicked' },
    onClose: { action: 'closed' },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: { children: '플레이그라운드' },
};

export const Closable: Story = {
  args: {
    children: '닫기 가능',
    closable: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(
        [
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'info',
          'light',
          'dark',
        ] as TagVariant[]
      ).map(v => (
        <Tag key={v} variant={v}>
          {v}
        </Tag>
      ))}
    </div>
  ),
};
