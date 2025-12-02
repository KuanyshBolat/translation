import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("stream_settings").select("*").order("page_name", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error fetching streams:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch streams" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { page_name, video_id, camera_name } = body

    const { data, error } = await supabase
      .from("stream_settings")
      .upsert(
        {
          page_name,
          video_id,
          camera_name,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "page_name" },
      )
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error updating stream:", error)
    return NextResponse.json({ success: false, error: "Failed to update stream" }, { status: 500 })
  }
}
