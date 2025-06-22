import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TokenValidationService {

    public Map<String, String> validateToken(String token, String role) {
        Map<String, String> errors = new HashMap<>();

        // Implement your token validation logic here
        // Return empty map if valid, otherwise add error message

        return errors;
    }
}
