

export const useGetFeedVideos = async (catalogId: string) => {
  const options = {
    method: 'GET',
    headers: {}
  };

  try {
    const response = await fetch(`https://martiolo.xyz/api/catalogues/get-checkout-catalogue?id=${catalogId}`, options as RequestInit);

    if (!response.ok) {
      // Manejar casos donde la respuesta no es exitosa
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const json = await response.json();
    const videos = json.data.products;

    // Devolver un objeto de datos obtenidos
    return videos;
  } catch (error:any) {
    console.error('Error fetching data:', error.message);

    // Devolver un objeto indicando fallo y detalle del error
    return "false";
  }
}