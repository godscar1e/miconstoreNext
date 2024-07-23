import Proposition from "@/model/propositions";

export async function createProposition(proposition) {
    try {
        await Proposition.create(proposition);
    } catch (e) {
        throw new Error(e);
    }
}
