export const InputTypeFIle = (props: {
    fieldName: string,
    for: string,
    handler: (e: FileList | null) => void
}) => {
    
    return <>
        <div className="input-group mb-3">
            <input 
                type="file" 
                className="form-control" 
                id={props.for} 
                onChange={(e) => props.handler(e.target.files)}
                />
        </div>
    </>
    
}