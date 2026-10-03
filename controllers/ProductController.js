const { getAllProductsByProjectID, addProduct, deleteProduct } = require("../models/ProductModel");

const getProductsByProjectID = async (projectID) => {
    const products = await getAllProductsByProjectID(projectID);
    return products;   
}

const addNewProduct = async (req, res) => {
    try {
        await addProduct(req.body);
        res.redirect("/Products");
    } catch (error) {
        console.error("Failed to add product record:", error.message);
        res.status(500).send("خطأ في حفظ البيانات");
    }
};

const deleteProductByID = async (req, res) => {
    try {
        const { prodID } = req.body;
        await deleteProduct(prodID);
        res.redirect("/Products");
    } catch (error) {
        console.error("Failed to delete Product:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

module.exports = { getProductsByProjectID, addNewProduct, deleteProductByID };