import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDb();
    const users = await User.aggregate([
      {
        $addFields: {
          voteCount: { $size: "$votedTracks" }
        }
      },
      {
        $sort: { 
          voteCount: -1 
        }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "shop_items",
          localField: "inventory.itemId",
          foreignField: "_id",
          as: "badges"
        }
      },
      {
        $project: {
          name: 1,
          voteCount: 1,
          badges: {
            $filter: {
              input: "$badges",
              as: "badge",
              cond: { $eq: ["$$badge.type", "badge"] }
            }
          }
        }
      }
    ]);
    console.log(users);
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
  }
}

