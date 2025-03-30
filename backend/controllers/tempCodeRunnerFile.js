const purchases = await Purchase.find({}).populate("courseId");
console.log("Populated Purchases:", purchases);