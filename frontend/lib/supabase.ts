// NO IMPORTS ALLOWED HERE
export const supabase = {
  from: () => ({
    insert: async () => ({ data: null, error: null }),
    select: async () => ({ data: [], error: null }),
  }),
} as any;