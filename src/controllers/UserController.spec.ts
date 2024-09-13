import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })
    it('Deve exibir um erro por não receber o nome do usuário', ()=>{
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })
    it('Deve retorna todos os usuários cadastrados', ()=>{
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })
    it('Deve exibir um erro por não receber o email do usuário', ()=>{
        const mockRequest = {
            body: {
                name: 'nath',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! email obrigatório' })
    })
    it('Deve deletar o usuário com o nome apresentado', ()=> {
        const mockRequest = {
            body: {
                name: 'nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    })
    it('Deve exibir um erro por não receber o nome do usuário que sera deletado',()=>{
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })
})
