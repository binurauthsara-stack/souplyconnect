CREATE TABLE public.responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  flavour TEXT NOT NULL,
  ratings JSONB NOT NULL,
  lifestyle TEXT NOT NULL,
  recommended TEXT NOT NULL,
  packaging TEXT NOT NULL,
  price TEXT NOT NULL,
  purchase TEXT NOT NULL,
  suggestions TEXT NOT NULL DEFAULT '',
  recommend TEXT NOT NULL
);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a response"
  ON public.responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read responses"
  ON public.responses FOR SELECT
  USING (true);

CREATE INDEX responses_created_at_idx ON public.responses (created_at DESC);