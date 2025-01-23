// app/api/call-waiter/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";

async function getGoogleSheetsClient() {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined;

    if (!privateKey) {
      throw new Error("Google private key is not configured");
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      throw new Error("Google client email is not configured");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    throw error;
  }
}

export async function POST(req) {
  try {
    const { tableNumber } = await req.json();

    if (!tableNumber) {
      return NextResponse.json(
        { success: false, message: "Table number is required" },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheetsClient();

    // Format the current date and time
    const callTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // Prepare row data
    const rowData = [[callTime, `Table ${tableNumber}`, "Pending"]];

    // Add row to Google Sheet (assuming a new sheet named "WaiterCalls")
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "WaiterCalls!A:C", // Make sure this sheet exists
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rowData,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Waiter call submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting waiter call:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit waiter call" },
      { status: 500 }
    );
  }
}
