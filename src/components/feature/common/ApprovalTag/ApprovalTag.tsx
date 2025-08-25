import Tag, { TagProps, TagVariant } from '@/components/common/Tag';
import { APPROVAL_OPTIONS } from '@/constants';

type ApprovalVariant = (typeof APPROVAL_OPTIONS)[number]['value'];

interface ApprovalTagProps extends Omit<TagProps, 'variant' | 'children'> {
  variant: ApprovalVariant;
}

const mapApprovalToVariant = (status: string): TagVariant => {
  const mapping: Record<ApprovalVariant, TagVariant> = {
    APPROVED: 'success', // 승인
    PENDING: 'secondary', // 승인대기
    REJECTED: 'danger', // 거절
  };
  return mapping[status as keyof typeof mapping] ?? 'primary';
};

const ApprovalTag = ({ variant, ...props }: ApprovalTagProps) => {
  return (
    <Tag variant={mapApprovalToVariant(variant)} {...props}>
      {APPROVAL_OPTIONS.find(option => option.value === variant)?.label}
    </Tag>
  );
};

export default ApprovalTag;
