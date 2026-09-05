import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export type AttendanceType = 'morning_only' | 'dinner_only' | 'both' | 'absent';

export const ATTENDANCE_LABEL_MAP: Record<AttendanceType, string> = {
  morning_only: 'Buổi sáng tại trường',
  dinner_only: 'Ăn tối tụ tập (7h)',
  both: 'Cả sáng lẫn tối (tới bến)',
  absent: 'Bận, chúc từ xa',
};

export interface RsvpData {
  id?: string;
  guest_name: string;
  email?: string;
  phone_number?: string;
  attendance_type: AttendanceType;
  message?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  created_at?: string;
}

export async function saveRsvp(
  data: Omit<RsvpData, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toISOString();
  const payload: RsvpData = {
    ...data,
    status: 'pending',
    created_at: timestamp,
  };

  // 1. Luôn lưu vào LocalStorage để đảm bảo dữ liệu không bao giờ bị mất
  try {
    localStorage.setItem('graduation_my_rsvp', JSON.stringify(payload));
    const existingHistory = JSON.parse(localStorage.getItem('graduation_all_rsvps') || '[]');
    existingHistory.unshift(payload);
    localStorage.setItem('graduation_all_rsvps', JSON.stringify(existingHistory));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  // 2. Nếu đã cấu hình Supabase -> đẩy trực tiếp lên Cloud Database vào bảng rsvp_guests
  if (supabase) {
    try {
      const { error } = await supabase.from('rsvp_guests').insert([
        {
          guest_name: payload.guest_name.trim(),
          email: payload.email?.trim() || null,
          phone_number: payload.phone_number?.trim() || null,
          attendance_type: payload.attendance_type,
          message: payload.message?.trim() || null,
          status: 'pending',
        },
      ]);

      if (error) {
        console.warn('Supabase insert error (falling back to local):', error);
        return { success: true, error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      console.warn('Supabase network error:', err);
      return { success: true, error: err instanceof Error ? err.message : 'Network error' };
    }
  }

  // Nếu chưa có kết nối, vẫn báo thành công (dữ liệu đã lưu an toàn vào LocalStorage)
  return { success: true };
}

export function getSavedRsvp(): RsvpData | null {
  try {
    const data = localStorage.getItem('graduation_my_rsvp');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

