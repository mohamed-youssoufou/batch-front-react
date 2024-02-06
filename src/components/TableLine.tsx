import { ProductDetailsDto } from "../dto/ProductDetailsDto"

export const TableLine = (props : { data: ProductDetailsDto }) => {
    return <>
        <tr>
            <td>{props.data.idProduct}</td>
            <td>{props.data.nameProduct}</td>
            <td>{props.data.quantity}</td>
            <td>{props.data.price}</td>
        </tr>
    </>
}