import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	if (
		json &&
		typeof json === "object" &&
		"productId" in json &&
		typeof json.productId === "string"
	) {
		revalidatePath(`/product/${json.productId}`);
		revalidatePath("/products");
		return NextResponse.json({ message: "OK" }, { status: 200 });
	}

	return NextResponse.json({ message: "Invalid body" }, { status: 400 });
}
