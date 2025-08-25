import Tag, { TagProps, TagVariant } from '@/components/common/Tag';
import { ASSIGNMENT_OPTIONS } from '@/constants';

type AssignmentVariant = (typeof ASSIGNMENT_OPTIONS)[number]['value'];

interface AssignmentTagProps extends Omit<TagProps, 'variant' | 'children'> {
  variant: AssignmentVariant;
}

const mapAssignmentToVariant = (assignment: string): TagVariant => {
  const mapping: Record<AssignmentVariant, TagVariant> = {
    ASSIGNED: 'primary', // 할당
    UNASSIGNED: 'secondary', // 미할당
  };
  return mapping[assignment as keyof typeof mapping] ?? 'primary';
};

const AssignmentTag = ({ variant, ...props }: AssignmentTagProps) => {
  return (
    <Tag variant={mapAssignmentToVariant(variant)} {...props}>
      {ASSIGNMENT_OPTIONS.find(option => option.value === variant)?.label}
    </Tag>
  );
};

export default AssignmentTag;
