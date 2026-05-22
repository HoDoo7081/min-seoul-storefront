CREATE TABLE public.discount_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_discount_clicks_code ON public.discount_clicks(code);
CREATE INDEX idx_discount_clicks_created_at ON public.discount_clicks(created_at DESC);

ALTER TABLE public.discount_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert click events"
ON public.discount_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(code)) >= 1 AND length(trim(code)) <= 100
);