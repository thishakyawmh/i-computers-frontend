export default function ProductCard(props){

    console.log(props.name);

    return(
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <img src={props.image} alt={props.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{props.name}</h2>
                <p className="text-gray-600 mt-2">Price: <span className="font-bold text-gray-800">{props.price}</span></p>
            </div>
        </div>
    );

}