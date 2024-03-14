import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String
});

const Mapping = mongoose.models.mapping || mongoose.model("mapping", mappingSchema);

export default Mapping;
