import { Complaint } from './Complaint';

export interface ComplaintRepository {
  save(complaint: Complaint): Promise<void>;
}
