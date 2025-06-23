@Service
public class TokenValidationService {

    public boolean validateToken(String token, String role) {
        // Dummy logic – replace with real JWT or session validation
        return token != null && token.contains(role); 
    }
}
