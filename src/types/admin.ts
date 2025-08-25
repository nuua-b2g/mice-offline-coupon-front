export interface Admin {
  idx: number;
  name: string;
  email: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  createdAt: string;
}
