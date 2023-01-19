using System.ComponentModel.DataAnnotations.Schema;

namespace Client.Models;

public class JWTokenVM
{
    [Column("statusCode")]
    public int StatusCode { get; set; }
    [Column("message")]
    public string Message { get; set; }
    [Column("data")]
    public string Data { get; set; }
}
