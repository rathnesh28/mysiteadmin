import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Form, Button, Card } from "react-bootstrap";
import styles from "@/styles/CategoryEdit.module.css"; // Custom CSS module

const CategoryEditPage = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
    status: "Active",
    seoTitle: "",
    seoDescription: "",
    parentCategory: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && id !== "add") {
      // Fetch category by ID (Replace with API call)
      setCategory({
        id,
        name: "Sample Category",
        description: "This is a sample description.",
        image: null,
        status: "Active",
        seoTitle: "Sample SEO Title",
        seoDescription: "Sample SEO Description",
        parentCategory: "Bags",
      });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? "Updating category:" : "Adding new category:", category);
    router.push("/categories");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.heading}>{isEditing ? "Edit Category" : "Add Category"}</h2>
        <Card className={styles.card}>
          <Form onSubmit={handleSubmit}>
            {/* Category Name */}
            <Form.Group className="mb-3">
              <Form.Label>Category Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                className={styles.formControl}
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                className={styles.formControl}
                value={category.description}
                onChange={(e) => setCategory({ ...category, description: e.target.value })}
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3">
                <Form.Label>Category Image</Form.Label>
                <div className={styles.imageUploadContainer}>
                    {category.image ? (
                    <img
                        src={URL.createObjectURL(category.image)}
                        alt="Preview"
                        className={styles.imagePreview}
                    />
                    ) : (
                    <i className={`bi bi-upload ${styles.uploadIcon}`}></i> // Bootstrap Icon
                    )}
                    <input
                    type="file"
                    accept="image/*"
                    className={styles.customFileInput}
                    onChange={handleImageChange}
                    />
                </div>
            </Form.Group>

            {/* Parent Category */}
            <Form.Group className="mb-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Control
                as="select"
                className={styles.formControl}
                value={category.parentCategory}
                onChange={(e) => setCategory({ ...category, parentCategory: e.target.value })}
              >
                <option value="">None</option>
                <option value="Bags">Bags</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Watches">Watches</option>
              </Form.Control>
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status *</Form.Label>
              <Form.Control
                as="select"
                className={styles.formControl}
                value={category.status}
                onChange={(e) => setCategory({ ...category, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            {/* SEO Meta Title */}
            <Form.Group className="mb-3">
              <Form.Label>SEO Meta Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SEO title"
                className={styles.formControl}
                value={category.seoTitle}
                onChange={(e) => setCategory({ ...category, seoTitle: e.target.value })}
              />
            </Form.Group>

            {/* SEO Meta Description */}
            <Form.Group className="mb-3">
              <Form.Label>SEO Meta Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter SEO description"
                className={styles.formControl}
                value={category.seoDescription}
                onChange={(e) => setCategory({ ...category, seoDescription: e.target.value })}
              />
            </Form.Group>

            {/* Submit Button */}
            
            <div className={styles.addWrapper} >
           <Button variant="secondary" className={styles.cancelButton} onClick={() => router.push("/categories")}>
              Cancel
            </Button>
          <Button type="submit" className={styles.addButton}>
            {isEditing ? "Update Category" : "Add Category"}
          </Button>
        </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default CategoryEditPage;
