export interface CreateNotesBody {
  title?: string;
  content?: string;
  tags?: string;
  blocks?: Record<string, any>[];
}
