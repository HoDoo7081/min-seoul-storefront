import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { syncSignupCustomerToShopify } from "@/lib/shopify-customers.functions";

// De-dup guard so we don't spam the sync fn on every token refresh
const syncedForUser = new Set<string>();

async function syncShopifyCustomer(user: User | null) {
  if (!user?.id || syncedForUser.has(user.id)) return;
  syncedForUser.add(user.id);
  try {
    await syncSignupCustomerToShopify({ data: {} });
  } catch (err) {
    // Don't block the app; just log
    console.warn("[Shopify] customer sync failed", err);
    syncedForUser.delete(user.id); // allow retry on next sign-in
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      setLoading(false);
      void syncShopifyCustomer(u);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        void syncShopifyCustomer(u);
      }
      if (event === "SIGNED_OUT") {
        syncedForUser.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    loading,
    signOut,
    isLoggedIn: !!user,
    email: user?.email ?? null,
    fullName: (user?.user_metadata?.full_name as string | undefined) ?? "",
  };
}
