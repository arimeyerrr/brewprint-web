import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, audience_type } = await req.json();

    if (!email || !audience_type) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (audience_type !== "lover" && audience_type !== "owner") {
      return new Response(JSON.stringify({ error: "Invalid audience type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email, audience_type });

    if (dbError) {
      if (dbError.code === "23505") {
        return new Response(JSON.stringify({ error: "already_registered" }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw dbError;
    }

    const label = audience_type === "owner" ? "shop owner" : "coffee lover";

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Brewprint <hello@brewprintapp.com>",
        to: email,
        subject: "You're on the Brewprint waitlist ☕",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #111;">
            <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 8px;">You're in. ☕</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Thanks for joining Brewprint as a ${label}. We're building something for people who take their coffee seriously — and we'll reach out the moment we launch.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Stay tuned.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              You signed up at brewprintapp.com · No spam, ever.
            </p>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.json();
      console.error("Resend error:", JSON.stringify(err));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
