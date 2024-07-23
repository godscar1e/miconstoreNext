import Course from "@/model/boughtcourses";

export async function createCourse(course) {
    try {
        await Course.create(course);
    } catch (e) {
        throw new Error(e);
    }
}
