namespace backend.Models.Response
{
    public class PlayResponse
    {
        public int Status { get; set; }
        public string Mensagem { get; set; }    

        public PlayResponse(int status, string mensagem)
        {
            Status = status;
            Mensagem = mensagem;
        }
    }
}