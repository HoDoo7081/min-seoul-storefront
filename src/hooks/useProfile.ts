import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  taiwan_ez_way_id: string | null;
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    if (!error && data) setProfile(data as Profile);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Omit<Profile, "id" | "email">>) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);
    if (!error) await fetchProfile();
    return { error };
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
}
