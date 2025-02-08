import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import styles from "../../styles/ProductEditPage.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { FaTimesCircle } from "react-icons/fa";

const ProductEditPage = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    price: "",
    category: "",
    status: "Active",
    mainImage: "",
    sideImages: [],
    color: "",
    size: "",
    description: "",
    material: "",
    salePrice: "",
    purchasePrice: "",
    discountPercentage: "",
    inventoryStock: "",
    weight: "",
    occasion: "",
    additionalColor: "", // New field
  });

  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const categories = ["Necklaces", "Bracelets", "Earrings", "Rings", "Watches"];

  useEffect(() => {
    if (id && id !== "add") {
      const fetchedProduct = {
        id: 1,
        name: "Gold Necklace",
        sku: "NECK-1234",
        price: "100",
        category: "Necklaces",
        status: "Active",
        mainImage: "",
        sideImages: [],
        color: "Gold",
        size: "One Size",
        description: "Elegant gold necklace.",
        material: "Gold",
        salePrice: "90",
        purchasePrice: "60",
        discountPercentage: "10",
        inventoryStock: "50",
        weight: "200g",  // Example weight
        occasion: "Formal", // Example occasion
        additionalColor: "Gold", // Additional color
      };
      setProduct(fetchedProduct);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? "Updating product:" : "Adding new product:", product);
    router.push("/products");
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, mainImage: imageUrl });
    }
  };

  const handleSideImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, sideImages: [...product.sideImages, ...imageUrls] });
  };

  // Remove side image
  const removeSideImage = (index) => {
    const updatedImages = product.sideImages.filter((_, i) => i !== index);
    setProduct({ ...product, sideImages: updatedImages });
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className={`${styles.pageTitle} text-center mb-2`}>
          {isEditing ? "Edit Product" : "Add Product"}
        </h2>

        <Card className={`${styles.cardContainer} shadow-sm mb-4`}>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className={`${styles.innerCard} p-4 mt-4`}>
                  <h3>Basic Details</h3>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={(e) =>
                          setProduct({ ...product, name: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="sku" className="mb-3">
                      <Form.Label>SKU</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter SKU"
                        value={product.sku}
                        onChange={(e) =>
                          setProduct({ ...product, sku: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="category" className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={product.category}
                        onChange={(e) =>
                          setProduct({ ...product, category: e.target.value })
                        }
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={(e) =>
                          setProduct({ ...product, description: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Col>

              <Col md={6}>
                <div className={`${styles.innerCard} p-4 mt-4`}>
                  <h3>Pricing & Stock Details</h3>
                  <Form>
                    <Form.Group controlId="salePrice" className="mb-3">
                      <Form.Label>Sale Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter sale price"
                        value={product.salePrice}
                        onChange={(e) =>
                          setProduct({ ...product, salePrice: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="purchasePrice" className="mb-3">
                      <Form.Label>Purchase Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter purchase price"
                        value={product.purchasePrice}
                        onChange={(e) =>
                          setProduct({ ...product, purchasePrice: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="discountPercentage" className="mb-3">
                      <Form.Label>Discount Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter discount percentage"
                        value={product.discountPercentage}
                        onChange={(e) =>
                          setProduct({ ...product, discountPercentage: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="inventoryStock" className="mb-3">
                      <Form.Label>Inventory Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter inventory stock"
                        value={product.inventoryStock}
                        onChange={(e) =>
                          setProduct({ ...product, inventoryStock: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className={`${styles.innerCard} p-4 mt-5`}>
                  <h3>Product Images</h3>

                  <Form.Group controlId="mainImage" className="mb-4">
                    <Form.Label className={styles.label}>Upload Main Image</Form.Label>
                    <div className={styles.imageUploadContainer}>
                      <input
                        type="file"
                        id="mainImageUpload"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className={styles.customFileInput}
                      />

                      <label htmlFor="mainImageUpload" className={styles.imagePreviewWrapper}>
                        {product.mainImage ? (
                          <img
                            src={product.mainImage}
                            alt="Main Image Preview"
                            className={styles.imagePreview}
                          />
                        ) : (
                          <div className={styles.blankPreviewBox}>
                            <CiCirclePlus className={styles.uploadIcon} />
                          </div>
                        )}
                      </label>
                    </div>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group controlId="sideImages" className="mb-4">
                    <Form.Label className={styles.label}>Upload Additional Images</Form.Label>
                    <div className={styles.imageUploadContainer}>
                      <input
                        type="file"
                        id="sideImagesUpload"
                        accept="image/*"
                        multiple
                        onChange={handleSideImagesChange}
                        className={styles.customFileInput}
                      />

                      <label htmlFor="sideImagesUpload" className={styles.imagePreviewWrapper}>
                        <div className={styles.blankPreviewBox}>
                          <CiCirclePlus className={styles.uploadIcon} />
                        </div>
                      </label>
                    </div>

                    <div className="d-flex flex-wrap mt-3">
                      {product.sideImages.map((image, index) => (
                        <div key={index} className={styles.sideImageWrapper}>
                          <img
                            src={image}
                            alt={`Side Image ${index + 1}`}
                            className={styles.sideImagePreview}
                          />
                          <button
                            className={styles.deleteButton}
                            onClick={() => removeSideImage(index)}
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                </div>
              </Col>

              <Col md={6}>
                <div className={`${styles.innerCard} p-4 mt-5`}>
                  <h3>Additional Details</h3>
                  <Form>
                    <Form.Group controlId="weight" className="mb-3">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product weight"
                        value={product.weight}
                        onChange={(e) =>
                          setProduct({ ...product, weight: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="occasion" className="mb-3">
                      <Form.Label>Occasion</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter occasion"
                        value={product.occasion}
                        onChange={(e) =>
                          setProduct({ ...product, occasion: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="additionalColor" className="mb-3">
                      <Form.Label>Additional Color</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter additional color"
                        value={product.additionalColor}
                        onChange={(e) =>
                          setProduct({ ...product, additionalColor: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className={styles.addProductWrapper} >
           <Button variant="secondary" className={styles.cancelButton} onClick={() => router.push("/products")}>
              Cancel
            </Button>
          <Button type="submit" className={styles.addProductButton}>
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductEditPage;
