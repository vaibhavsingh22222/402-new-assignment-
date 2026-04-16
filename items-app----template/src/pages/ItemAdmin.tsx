import { useState, useEffect } from "react";
import type { Item } from "../types/item"
import itemService from "../Services/itemService";
import { Container, Section } from "../components/Layout";
import { Heading, Text } from "../components/Tpography"
import { Input } from "../components/input"
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function ItemAdmin(){

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [formError, setFormError] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        price: ""
    });

    const loadItems = async () => {
        try {
            const data = await itemService.getAll();
            setItems(data);
        } catch (err: any) {
            setError("Failed to load businesses");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        loadItems();
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
        if (!formData.id || !formData.name || !formData.description || !formData.price){
            setFormError("All fields are required")
            return;
        }

        try{
            const updatedItem: Item = {
                id: formData.id as any,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price)
            }

            await itemService.put(updatedItem);

            setFormData({id: "",name:"",price:"",description:""})
            setFormError("");
            setIsEditing(false);
            window.alert("Business Updated Successfully!");
            await loadItems();
        }catch (err: unknown){
            setFormError("Failed to save business");
        }
    };

    const handleUpdate = (item: Item) => {
        setFormData({
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            price: item.price.toString()
        });
        setIsEditing(true);
    }

    const handleDelete = async (ItemId: string) => {
        if (window.confirm("Are you sure you want to delete this business?")){
            try{
                await itemService.delete(ItemId);
                setItems(prev => prev.filter(item => item.id.toString() !== ItemId));
                window.alert("Business Deleted Successfully!")
                await loadItems()
            }catch (err: unknown){
                setError("Failed to delete business");
            }
        }
    };  

    if (loading) return (
        <Container>
            <Section>
                <Text className="text-emerald-700">Businesses are loading.....</Text>
            </Section>
        </Container>
    );

    return(
        <Container>

            {/* 🌿 HEADER */}
            <Section className="bg-transparent">
                <Heading level={1} className="text-emerald-800">
                    Business Admin
                </Heading>
            </Section>

            {/* 🌿 FORM */}
            <Section className="bg-transparent">
                <Heading level={2} className="text-emerald-800">
                    Manage Businesses
                </Heading>

                <div className="mt-8 max-w-2xl">
                    <div className="space-y-4">

                        <Input
                            label="Business ID"
                            name="id"
                            type="text"
                            placeholder="Enter Business ID"
                            value={formData.id}
                            onChange={handleInputChange}
                            disabled={isEditing}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Business Name"
                            name="name"
                            type="text"
                            placeholder="Enter Business Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Business Description"
                            name="description"
                            type="text"
                            placeholder="Enter Business Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="focus:ring-emerald-500 focus:border-emerald-500"
                        />

                        <Input
                            label="Business Price"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter Business Price"
                            value={formData.price}
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
                                Save Business
                            </Button>

                            <Button 
                                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                                onClick={() => {
                                    setFormData({ id: "", name: "", price: "", description: "" });
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
                    All Businesses
                </Heading>

                {error && (
                    <Text className="text-emerald-700 mb-6">
                        {error}
                    </Text>
                )}

                <div className="grid grid-cols-3 gap-4 w-full max-w-7xl mx-auto">

                    {items.map(item => (
                        <Card
                            key={item.id}
                            title={item.name}
                            description={item.description}
                            className="bg-white/70 border-emerald-200"
                        >
                            <div className="flex gap-2">

                                <Button 
                                    onClick={() => handleUpdate(item)} 
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    Update
                                </Button>

                                <Button 
                                    onClick={() => handleDelete(item.id.toString())} 
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