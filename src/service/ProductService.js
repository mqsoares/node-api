import mongoose from "mongoose";
import Product from "../model/Product.js"
import UserService from "./UserService.js";

export default class ProductService{
    // Define o método estático assíncrono 'create' com os parâmetros 'req', 'name', 'description', 'state' e 'purchased_at'
    static async create(req, name, description, state, purchased_at) {
        // Obtém o usuário atual através do serviço de usuários usando as informações da requisição
        const user = await UserService.getUser(req);

        // Inicializa um array vazio para armazenar as imagens
        let images = [];
        // Verifica se há arquivos na requisição
        if (req.files) {
            // Se houver, armazena-os no array 'images'
            images = req.files;
        }

        // Define a variável 'available' como true para indicar que o produto está disponível
        const available = true;

        // Verifica se o nome do produto foi fornecido
        if (!name) {
            // Se não, cria um novo erro com a mensagem "O nome é obrigatório."
            const error = new Error("O nome é obrigatório.");
            // Define o status code do erro para 422 (Unprocessable Entity)
            error.statusCode = 422;
            // Lança o erro, interrompendo a execução do código
            throw error;
        }

        // Verifica se a descrição do produto foi fornecida
        if (!description) {
            // Se não, cria um novo erro com a mensagem "A descrição é obrigatória."
            const error = new Error("A descrição é obrigatória.");
            // Define o status code do erro para 422 (Unprocessable Entity)
            error.statusCode = 422;
            // Lança o erro, interrompendo a execução do código
            throw error;
        }

        // Verifica se o estado do produto foi fornecido
        if (!state) {
            // Se não, cria um novo erro com a mensagem "O estado é obrigatório."
            const error = new Error("O estado é obrigatório.");
            // Define o status code do erro para 422 (Unprocessable Entity)
            error.statusCode = 422;
            // Lança o erro, interrompendo a execução do código
            throw error;
        }

        // Verifica se a data de compra do produto foi fornecida
        if (!purchased_at) {
            // Se não, cria um novo erro com a mensagem "A data de compra é obrigatória."
            const error = new Error("A data de compra é obrigatória.");
            // Define o status code do erro para 422 (Unprocessable Entity)
            error.statusCode = 422;
            // Lança o erro, interrompendo a execução do código
            throw error;
        }

        // Verifica se pelo menos uma imagem foi fornecida
        if (images.length === 0) {
            // Se não, cria um novo erro com a mensagem "A imagem é obrigatória."
            const error = new Error("A imagem é obrigatória.");
            // Define o status code do erro para 422 (Unprocessable Entity)
            error.statusCode = 422;
            // Lança o erro, interrompendo a execução do código
            throw error;
        }

        // Cria uma nova instância de Product com os dados fornecidos, incluindo o ID do proprietário (user._id) e um array vazio de imagens
        const product = new Product({name, description, state, owner: user._id, available, images: []});

        // Itera sobre o array de imagens e adiciona cada filename ao array de imagens do produto
        images.map((image) => product.images.push(image.filename));

        // Salva a nova instância de produto no banco de dados e aguarda a conclusão do processo
        const productSaved = await product.save();

        // Retorna o produto salvo como resultado da função
        return productSaved;
    }

    // Define o método estático assíncrono 'index' com os parâmetros 'page' e 'limit'
    static async index(page, limit) {
        // Busca todos os produtos no banco de dados, ordenados pela data de criação em ordem decrescente
        // Limita o número de produtos retornados ao valor de 'limit'
        // Pula um número de produtos calculado pela fórmula '(page-1) * limit' para paginação
        // Popula o campo 'owner' do produto, excluindo o campo 'password'
        // Popula também o campo 'reciever' do produto
        const products = await Product.find()
            .sort("-createdAt")
            .limit(limit)
            .skip((page - 1) * limit)
            .populate({ path: "owner", select: "-password" })
            .populate("reciever");

        // Retorna a lista de produtos encontrados
        return products;
    }

    static async showProductById(productID) {

        if (!mongoose.isValidObjectId(productID)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(productID);
        return product;
    }


    static async show(){
        
    }

    static async update(req, name, description, state, purchased_at){

        if (!mongoose.isValidObjectId(req.params.id)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(req.params.id);

        let images = [];
        if (req.files) {
            images = req.files.map(file => file.filename);
        }

        const available = true;

        if (!name) {
            const error = new Error("O nome é obrigatório.");
            error.statusCode = 422;
            throw error;
        }

        if (!description) {
            const error = new Error("A descrição é obrigatória.");
            error.statusCode = 422;
            throw error;
        }

        if (!state) {
            const error = new Error("O estado é obrigatório.");
            error.statusCode = 422;
            throw error;
        }

        if (!purchased_at) {
            const error = new Error("A data de compra é obrigatória.");
            error.statusCode = 422;
            throw error;
        }

        if (images.length === 0) {
            const error = new Error("A imagem é obrigatória.");
            error.statusCode = 422;
            throw error;
        }

        product.name = name;
        product.description = description;
        product.state = state;
        product.purchased_at = purchased_at;
        product.available = available;

        const updatedProduct = await product.save();

        return updatedProduct;
    }

    static async delete(productID){
        if (!mongoose.isValidObjectId(productID)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }

        return await Product.findByIdAndDelete(productID).then(() => {return true});
    }

    static async showUserProducts(userId){
        const products = await Product.find({ owner: userId }).populate({ path: "owner", select: "-password" });
        return products;
    }

    static async showRecieverProducts(userId){
        const products = await Product.find({ reciever: userId });
        return products;
    }

    static async schedule(req){
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("ID inválido.");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(id);
        if (!product) {
            const error = new Error("Produto não encontrado.");
            error.statusCode = 404;
            throw error;
        }

        if (!product.available) {
            const error = new Error("Produto não disponível.");
            error.statusCode = 422;
            throw error;
        }

        const user = await UserService.getUser(req);
        if (!product.owner.equals(user._id)) {
            const error = new Error("Usuário não autorizado a agendar este produto.");
            error.statusCode = 403;
            throw error;
        }

        product.reciever = user._id;
        await product.save();

        return {
            message: `A visita foi agendada com Sucesso, entre em contato com ${user.name}, pelo telefone, ${user.phone}`
        };
    }

    static async concludeDonation(req){
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("ID inválido.");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(id);
        if (!product) {
            const error = new Error("Produto não encontrado.");
            error.statusCode = 404;
            throw error;
        }

        if (!product.available) {
            const error = new Error("Produto não disponível.");
            error.statusCode = 422;
            throw error;
        }

        const user = await UserService.getUser(req);
        if (!product.owner.equals(user._id)) {
            const error = new Error("Usuário não autorizado a agendar este produto.");
            error.statusCode = 403;
            throw error;
        }

        product.available = false;
        product.donated_at = new Date();

        await product.save();

        return {
            message: "Doação concluída com Sucesso."
        };
    }
}