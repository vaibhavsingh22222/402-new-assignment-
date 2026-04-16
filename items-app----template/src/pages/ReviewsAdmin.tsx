import { useState, useEffect } from "react";
import type { Review } from "../types/reviews"
import reviewService from "../Services/ReviewsServices"
import { Container, Section } from "../components/Layout";
import { Heading, Text } from "../components/Tpography";
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function ReviewAdmin() {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [formError, setFormError] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        comment: "",
        authorName: ""
    });

    const loadReviews = async () => {
        try {
            const data = await reviewService.getAll();
            setReviews(data);
        } catch (err: any) {
            setError("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFormError("");
    };

    const handleSave = async () => {
        if (!formData.id || !formData.title || !formData.comment || !formData.authorName) {
            setFormError("All fields are required");
            return;
        }

        try {
            const updatedReview: Review = {
                id: formData.id as any,
                title: formData.title,
                comment: formData.comment,
                authorName: formData.authorName
            };

            await reviewService.put(updatedReview);

            setFormData({ id: "", title: "", comment: "", authorName: "" });
            setFormError("");
            setIsEditing(false);
            window.alert("Review Updated Successfully!");
            await loadReviews();
        } catch (err: unknown) {
            setFormError("Failed to save review");
        }
    };

    const handleUpdate = (review: Review) => {
        setFormData({
            id: review.id.toString(),
            title: review.title,
            comment: review.comment,
            authorName: review.authorName
        });
        setIsEditing(true);
    };

    const handleDelete = async (reviewId: string) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await reviewService.delete(reviewId);
                setReviews(prev => prev.filter(review => review.id.toString() !== reviewId));
                window.alert("Review Deleted Successfully!");
                await loadReviews();
            } catch (err: unknown) {
                setError("Failed to delete review");
            }
        }
    };

    if (loading) return (
        <Container>
            <Section>
                <Text className="text-emerald-700">Reviews are loading.....</Text>
            </Section>
        </Container>
    );

    return (
        <Container>

            {/* 🌿 HEADER */}
            <Section className="bg-transparent">
                <Heading level={1} className="text-emerald-800">
                    Review Admin
                </Heading>
            </Section>

            {/* 🌿 FORM */}
            <Section className="bg-transparent">
                <Heading level={2} className="text-emerald-800">
                    Manage Reviews
                </Heading>

                <div className="mt-8 max-w-2xl">
                    <div className="space-y-4">

                        <Input
                            label="Review ID"
                            name="id"
                            type="text"
                            placeholder="Enter Review ID"
                            value={formData.id}
                            onChange={handleInputChange}
                            disabled={isEditing}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Review Title"
                            name="title"
                            type="text"
                            placeholder="Enter Review Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Comment"
                            name="comment"
                            type="text"
                            placeholder="Enter Review Comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Author Name"
                            name="authorName"
                            type="text"
                            placeholder="Enter Author Name"
                            value={formData.authorName}
                            onChange={handleInputChange}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        {formError && (
                            <Text className="text-emerald-700">
                                {formError}
                            </Text>
                        )}

                        <div className="flex gap-4 pt-4">

                            <Button
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={handleSave}
                            >
                                Save Review
                            </Button>

                            <Button
                                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                                onClick={() => {
                                    setFormData({ id: "", title: "", comment: "", authorName: "" });
                                    setIsEditing(false);
                                }}
                            >
                                Clear Form
                            </Button>

                        </div>

                    </div>
                </div>
            </Section>

            {/* 🌿 LIST */}
            <Section className="bg-transparent">
                <Heading level={2} className="text-emerald-800">
                    All Reviews
                </Heading>

                {error && (
                    <Text className="text-emerald-700 mb-6">
                        {error}
                    </Text>
                )}

                <div className="grid grid-cols-3 gap-4 w-full max-w-7xl mx-auto">

                    {reviews.map(review => (
                        <Card
                            key={review.id}
                            title={review.title}
                            description={`"${review.comment}" — ${review.authorName}`}
                            className="bg-white/70 border-emerald-200"
                        >
                            <div className="flex gap-2">

                                <Button
                                    onClick={() => handleUpdate(review)}
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    Update
                                </Button>

                                <Button
                                    onClick={() => handleDelete(review.id.toString())}
                                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white"
                                >
                                    Delete
                                </Button>

                            </div>
                        </Card>
                    ))}

                </div>
            </Section>

        </Container>
    );
}